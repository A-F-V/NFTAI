pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Billable {
    AggregatorV3Interface internal priceFeed;
    uint256 private _dec;

    constructor(address price_agg_address) {
        priceFeed = AggregatorV3Interface(price_agg_address);
        _dec = priceFeed.decimals();
    }

    modifier bill(uint256 min_amt) {
        uint256 eth_req = (min_amt * 10**(_dec - 2 + 18)) / (_getLatestPrice());
        require(
            msg.value >= eth_req,
            string(
                abi.encodePacked(
                    "Insufficient ETH - ",
                    uint2str(msg.value),
                    " - ",
                    uint2str(eth_req)
                )
            )
        );
        payable(msg.sender).transfer(msg.value - eth_req);
        // refund extra
        _;
    }

    function _getLatestPrice() public view returns (uint256) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 temp = _i;
        uint256 length;
        while (temp != 0) {
            //calculate number of digits
            length++;
            temp /= 10;
        }
        bytes memory bstr = new bytes(length); //create string of that length
        uint256 k = length;
        temp = _i;
        while (temp != 0) {
            bstr[--k] = bytes1(uint8(48 + (temp % 10))); //ascii for 0-9
            temp /= 10;
        }
        str = string(bstr);
    }
}
