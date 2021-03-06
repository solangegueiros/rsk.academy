/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type { AcademyWalletType, AcademyWalletInterface } from '../AcademyWalletType'

const _abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'thisBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610512806100616000396000f3fe60806040526004361061004e5760003560e01c806327f3a72a146100af5780633ccfd60b146100da57806370a08231146101055780638da5cb5b14610142578063d0e30db01461016d576100aa565b366100aa57346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546100a191906103f8565b92505081905550005b600080fd5b3480156100bb57600080fd5b506100c461018b565b6040516100d191906103dd565b60405180910390f35b3480156100e657600080fd5b506100ef610193565b6040516100fc91906103c2565b60405180910390f35b34801561011157600080fd5b5061012c60048036038101906101279190610351565b610270565b60405161013991906103dd565b60405180910390f35b34801561014e57600080fd5b506101576102b8565b60405161016491906103a7565b60405180910390f35b6101756102de565b60405161018291906103c2565b60405180910390f35b600047905090565b60008033905060008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610266573d6000803e3d6000fd5b5060019250505090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461032e91906103f8565b925050819055506001905090565b60008135905061034b816104c5565b92915050565b60006020828403121561036357600080fd5b60006103718482850161033c565b91505092915050565b6103838161044e565b82525050565b61039281610460565b82525050565b6103a18161048c565b82525050565b60006020820190506103bc600083018461037a565b92915050565b60006020820190506103d76000830184610389565b92915050565b60006020820190506103f26000830184610398565b92915050565b60006104038261048c565b915061040e8361048c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561044357610442610496565b5b828201905092915050565b60006104598261046c565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6104ce8161044e565b81146104d957600080fd5b5056fea2646970667358221220e6d6790dfab413f9edf913894d60af42e9369d4933133435feb580c414bb305164736f6c63430008010033'

export class AcademyWalletFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<AcademyWalletType> {
    return super.deploy(overrides || {}) as Promise<AcademyWalletType>
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): AcademyWalletType {
    return super.attach(address) as AcademyWalletType
  }
  connect(signer: Signer): AcademyWalletFactory {
    return super.connect(signer) as AcademyWalletFactory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): AcademyWalletInterface {
    return new utils.Interface(_abi) as AcademyWalletInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AcademyWalletType {
    return new Contract(address, _abi, signerOrProvider) as AcademyWalletType
  }
}
