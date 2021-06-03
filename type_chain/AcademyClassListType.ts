/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import { TypedEventFilter, TypedEvent, TypedListener } from './commons'

export interface AcademyClassListInterface extends ethers.utils.Interface {
  functions: {
    'DEFAULT_ADMIN_ROLE()': FunctionFragment
    'active()': FunctionFragment
    'getRoleAdmin(bytes32)': FunctionFragment
    'getRoleMember(bytes32,uint256)': FunctionFragment
    'getRoleMemberCount(bytes32)': FunctionFragment
    'grantRole(bytes32,address)': FunctionFragment
    'hasRole(bytes32,address)': FunctionFragment
    'renounceRole(bytes32,address)': FunctionFragment
    'revokeRole(bytes32,address)': FunctionFragment
    'createAcademyClass(address,address,string)': FunctionFragment
    'changeActiveClass(address)': FunctionFragment
    'addClassOwner(address,address)': FunctionFragment
    'delClassOwner(address,address)': FunctionFragment
    'changeActive()': FunctionFragment
    'isAcademyClass(address)': FunctionFragment
    'getAcademyClass(address)': FunctionFragment
    'countAcademyClasses()': FunctionFragment
    'listAcademyClasses()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'DEFAULT_ADMIN_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'active', values?: undefined): string
  encodeFunctionData(functionFragment: 'getRoleAdmin', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'getRoleMember', values: [BytesLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'getRoleMemberCount', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'grantRole', values: [BytesLike, string]): string
  encodeFunctionData(functionFragment: 'hasRole', values: [BytesLike, string]): string
  encodeFunctionData(functionFragment: 'renounceRole', values: [BytesLike, string]): string
  encodeFunctionData(functionFragment: 'revokeRole', values: [BytesLike, string]): string
  encodeFunctionData(functionFragment: 'createAcademyClass', values: [string, string, string]): string
  encodeFunctionData(functionFragment: 'changeActiveClass', values: [string]): string
  encodeFunctionData(functionFragment: 'addClassOwner', values: [string, string]): string
  encodeFunctionData(functionFragment: 'delClassOwner', values: [string, string]): string
  encodeFunctionData(functionFragment: 'changeActive', values?: undefined): string
  encodeFunctionData(functionFragment: 'isAcademyClass', values: [string]): string
  encodeFunctionData(functionFragment: 'getAcademyClass', values: [string]): string
  encodeFunctionData(functionFragment: 'countAcademyClasses', values?: undefined): string
  encodeFunctionData(functionFragment: 'listAcademyClasses', values?: undefined): string

  decodeFunctionResult(functionFragment: 'DEFAULT_ADMIN_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'active', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getRoleAdmin', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getRoleMember', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getRoleMemberCount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'createAcademyClass', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'changeActiveClass', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addClassOwner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'delClassOwner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'changeActive', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isAcademyClass', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getAcademyClass', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'countAcademyClasses', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'listAcademyClasses', data: BytesLike): Result

  events: {
    'AcademyClassCreated(address,string)': EventFragment
    'RoleAdminChanged(bytes32,bytes32,bytes32)': EventFragment
    'RoleGranted(bytes32,address,address)': EventFragment
    'RoleRevoked(bytes32,address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AcademyClassCreated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RoleAdminChanged'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RoleGranted'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RoleRevoked'): EventFragment
}

export interface AcademyClassListType extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: AcademyClassListInterface

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>

    active(overrides?: CallOverrides): Promise<[boolean]>

    /**
     * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
     */
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>

    /**
     * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
     */
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<[string]>

    /**
     * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
     */
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>

    /**
     * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
     */
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    /**
     * Returns `true` if `account` has been granted `role`.
     */
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>

    /**
     * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
     */
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    /**
     * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
     */
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    createAcademyClass(
      addressStudentList: string,
      addressStudentQuiz: string,
      className: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    changeActiveClass(
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    addClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    delClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    changeActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

    isAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<[boolean]>

    getAcademyClass(
      classAddress: string,
      overrides?: CallOverrides,
    ): Promise<
      [
        [string, boolean, string] & {
          classAddress: string
          active: boolean
          name: string
        },
      ]
    >

    countAcademyClasses(overrides?: CallOverrides): Promise<[BigNumber]>

    listAcademyClasses(
      overrides?: CallOverrides,
    ): Promise<
      [
        ([string, boolean, string] & {
          classAddress: string
          active: boolean
          name: string
        })[],
      ]
    >
  }

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>

  active(overrides?: CallOverrides): Promise<boolean>

  /**
   * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
   */
  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>

  /**
   * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
   */
  getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>

  /**
   * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
   */
  getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>

  /**
   * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
   */
  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  /**
   * Returns `true` if `account` has been granted `role`.
   */
  hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>

  /**
   * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
   */
  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  /**
   * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
   */
  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  createAcademyClass(
    addressStudentList: string,
    addressStudentQuiz: string,
    className: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  changeActiveClass(
    classAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  addClassOwner(
    account: string,
    classAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  delClassOwner(
    account: string,
    classAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  changeActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

  isAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<boolean>

  getAcademyClass(
    classAddress: string,
    overrides?: CallOverrides,
  ): Promise<
    [string, boolean, string] & {
      classAddress: string
      active: boolean
      name: string
    }
  >

  countAcademyClasses(overrides?: CallOverrides): Promise<BigNumber>

  listAcademyClasses(
    overrides?: CallOverrides,
  ): Promise<
    ([string, boolean, string] & {
      classAddress: string
      active: boolean
      name: string
    })[]
  >

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>

    active(overrides?: CallOverrides): Promise<boolean>

    /**
     * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
     */
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>

    /**
     * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
     */
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>

    /**
     * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
     */
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
     */
    grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>

    /**
     * Returns `true` if `account` has been granted `role`.
     */
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>

    /**
     * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
     */
    renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>

    /**
     * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
     */
    revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>

    createAcademyClass(
      addressStudentList: string,
      addressStudentQuiz: string,
      className: string,
      overrides?: CallOverrides,
    ): Promise<string>

    changeActiveClass(classAddress: string, overrides?: CallOverrides): Promise<boolean>

    addClassOwner(account: string, classAddress: string, overrides?: CallOverrides): Promise<void>

    delClassOwner(account: string, classAddress: string, overrides?: CallOverrides): Promise<void>

    changeActive(overrides?: CallOverrides): Promise<boolean>

    isAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<boolean>

    getAcademyClass(
      classAddress: string,
      overrides?: CallOverrides,
    ): Promise<
      [string, boolean, string] & {
        classAddress: string
        active: boolean
        name: string
      }
    >

    countAcademyClasses(overrides?: CallOverrides): Promise<BigNumber>

    listAcademyClasses(
      overrides?: CallOverrides,
    ): Promise<
      ([string, boolean, string] & {
        classAddress: string
        active: boolean
        name: string
      })[]
    >
  }

  filters: {
    AcademyClassCreated(
      classAddress?: string | null,
      className?: null,
    ): TypedEventFilter<[string, string], { classAddress: string; className: string }>

    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null,
    ): TypedEventFilter<[string, string, string], { role: string; previousAdminRole: string; newAdminRole: string }>

    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): TypedEventFilter<[string, string, string], { role: string; account: string; sender: string }>

    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null,
    ): TypedEventFilter<[string, string, string], { role: string; account: string; sender: string }>
  }

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>

    active(overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
     */
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
     */
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
     */
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
     */
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    /**
     * Returns `true` if `account` has been granted `role`.
     */
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>

    /**
     * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
     */
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    /**
     * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
     */
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    createAcademyClass(
      addressStudentList: string,
      addressStudentQuiz: string,
      className: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    changeActiveClass(
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    addClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    delClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    changeActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>

    isAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<BigNumber>

    getAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<BigNumber>

    countAcademyClasses(overrides?: CallOverrides): Promise<BigNumber>

    listAcademyClasses(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>

    active(overrides?: CallOverrides): Promise<PopulatedTransaction>

    /**
     * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
     */
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>

    /**
     * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
     */
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>

    /**
     * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
     */
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>

    /**
     * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
     */
    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    /**
     * Returns `true` if `account` has been granted `role`.
     */
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    /**
     * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
     */
    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    /**
     * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
     */
    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    createAcademyClass(
      addressStudentList: string,
      addressStudentQuiz: string,
      className: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    changeActiveClass(
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    addClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    delClassOwner(
      account: string,
      classAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    changeActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>

    isAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    getAcademyClass(classAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    countAcademyClasses(overrides?: CallOverrides): Promise<PopulatedTransaction>

    listAcademyClasses(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
