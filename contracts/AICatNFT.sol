pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Billable.sol";

contract AICatNFT is ERC721("AICatNFT", "ICAT"), Billable {
    uint256 public total_cats = 0;
    mapping(uint256 => bool) public ticket_used;
    mapping(uint256 => string) private token_uri;
    address private owner;

    uint256 mintPriceUSD;

    event PurchasedTicket(address indexed buyer, uint256 indexed ticket_id);
    event CatCreated(uint256 indexed ticket_id);

    constructor(address price_agg_address) Billable(price_agg_address) {
        owner = msg.sender;
        mintPriceUSD = 100; //cents
    }

    function _baseURI() internal view override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs";
    }

    function purchaseTicket() public payable bill(mintPriceUSD) {
        uint256 ticket = total_cats + 1;
        _safeMint(msg.sender, ticket);
        //_setTokenURI(newItemId, tokenURI);
        total_cats = total_cats + 1;
        emit PurchasedTicket(msg.sender, ticket);
    }

    function token_full_uri(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return string(abi.encodePacked(_baseURI(), "/", token_uri[tokenId]));
    }

    function setMintPriceUSD(uint256 price) public OnlyOwner {
        mintPriceUSD = price;
    }

    function createCat(uint256 ticket, string calldata tokenURI)
        public
        tokenOwnerOnly(ticket)
    {
        ticket_used[ticket] = true;
        _setTokenURI(ticket, tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI)
        internal
        tokenOwnerOnly(tokenId)
    {
        token_uri[tokenId] = tokenURI;
    }

    modifier tokenOwnerOnly(uint256 token) {
        require(msg.sender == ownerOf(token));
        _;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
