import { ContractBase } from '@components'
export interface ContractCardProps {
  name: string
  contract: any
}

export const ContractCard = ({ contract, name }: ContractCardProps): JSX.Element => {
  return (
    <ContractBase name={name} contract={contract}>Contract</ContractBase>
  )
}
