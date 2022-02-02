from cProfile import run
from ecdsa import SigningKey, VerifyingKey, SECP256k1
import os
from pyrsistent import b
from web3 import Web3

from flask import Flask
from flask import request, send_file
import json
import torch
import torch.nn as nn
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import model
from flask_cors import CORS, cross_origin
import base64
web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# Define module


# Load pretrained decoder


@app.route("/", methods=['POST'])
@cross_origin()
def serve():
    abi = json.load(open('artifacts/contracts/AICatNFT.sol/AICatNFT.json'))['abi']
    contract = web3.eth.contract("0x00CFDd28F23AFbeD7A1cd477BD9fa75ecE7138af", abi=abi)
    data = json.loads(request.get_data())
    ticket = int(data['ticket'])
    address = int(data['address'], 16)
    print("Ticket: ", ticket)
    # 1 address owns the ticket

    owner = int(contract.functions.ownerOf(ticket).call(), 16)
    if owner != address:
        return "You do not have permission to access this ticket", 400

    # 2 the ticket is unused
    if contract.functions.ticket_used(ticket).call():
        return "This ticket has already been used", 400

    model.run_model()
    print("new cat")
    b64 = base64.b64encode(open('output.png', 'rb').read())
    print(str(b64)[2:-1])
    return str(b64)[2:-1], 200


if __name__ == '__main__':
    app.run()
