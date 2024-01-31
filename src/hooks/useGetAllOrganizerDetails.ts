'use client'
import { useRouter } from 'next/navigation'
import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export const useGetAllOrganizerDetails = () => {
	const router = useRouter()
	const { address, isConnecting, isConnected, isDisconnected } = useAccount()

	const { data: allOrganizerDetails, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'getAllOrganizerDetails',
		chainId: 80001,
		onSuccess: async data => {},
	})

	return { isFetching, allOrganizerDetails, isConnecting, isConnected, isDisconnected }
}
