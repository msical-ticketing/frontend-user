'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useApprove } from '../../hooks/useApprove'
import SuccessModal from '@/components/modals/Success'
import ProcessingModal from '@/components/modals/Processing'
import { ApproveButton } from '../../components/ApproveButton'
import BlockPlaceholder from '../../components/BlockPlaceholder'
import { useGetAllOrganizers } from '../../hooks/useGetAllOrganizers'
import { useAccount, usePublicClient, useWebSocketPublicClient } from 'wagmi'
import { useGetAllOrganizerDetails } from '../../hooks/useGetAllOrganizerDetails'

const AdminPage = () => {
	const { address } = useAccount()
	const router = useRouter()

	useEffect(() => {
		if (address != process.env.NEXT_PUBLIC_OWNER) router.replace('/')
	}, [address, router])

	const { write, isLoading, isSuccess, data, status } = useApprove()

	const { isFetching, allOrganizers } = useGetAllOrganizers()
	const { allOrganizerDetails } = useGetAllOrganizerDetails()

	if (isFetching) {
		return <BlockPlaceholder />
	}

	const onClick = (organizer: any) => {
		write({ args: [organizer] })
	}

	const organizers: any = allOrganizers
	const organizerDetails: any = allOrganizerDetails

	console.log('organizers', organizers)
	console.log('organizerDetails', organizerDetails)

	if (organizerDetails.length)
		return (
			<>
				<div className="grid gap-6">
					{organizerDetails
						.sort((a: any, b: any) => (a.status > b.status ? 1 : -1))
						.map((organizer: any, index: number) => (
							<Card key={index}>
								<div className="flex justify-between items-center px-4 py-2">
									{organizer.account}

									{organizer.status.toString() == 1 ? (
										<Button onClick={() => onClick(organizer.account)}>Approve</Button>
									) : (
										<Button variant="outline">Approved</Button>
									)}
								</div>
							</Card>
						))}
				</div>
				{isLoading && <ProcessingModal open={isLoading} />}
				{isSuccess && <SuccessModal open={isSuccess} txHash={data?.hash} path="/event/manage" />}
			</>
		)
}

export default AdminPage
