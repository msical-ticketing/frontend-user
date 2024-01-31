'use client'
import Link from 'next/link'
import Image from 'next/image'
import Input from './ui/Input'
import Spinner from './Spinner'
import Button from './ui/Button'
import { useAccount } from 'wagmi'
import { Ticket } from '@/interfaces'
import SuccessModal from './modals/Success'
import ProcessingModal from './modals/Processing'
import { useTransfer } from '../hooks/useTransfer'
import { CheckCircle } from '@phosphor-icons/react'
import { FC, PropsWithChildren, useState } from 'react'
import Card, { CardContent, CardFooter } from './ui/Card'
import Dialog, { DialogContent, DialogTrigger } from './ui/Dialog'
import Form, { FormField, FormItem, FormControl, FormLabel, useForm } from './ui/Form'

const TicketCard: FC<PropsWithChildren<{ ticket: any }>> = ({ ticket }) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const form = useForm<{}>({})

	const { write, isLoading, isSuccess, data, status: txStatus } = useTransfer()
	const { address } = useAccount()

	console.log('ticket', ticket)

	// if (isLoading) {
	// 	return (
	// 		<div className="h-full w-full flex justify-center items-center flex-col gap-4">
	// 			<Spinner />
	// 			Processing...
	// 		</div>
	// 	)
	// }

	// if (isSuccess) {
	// 	return (
	// 		<div className="h-full w-full flex justify-center items-center flex-col gap-1">
	// 			<CheckCircle className="w-12 h-12 text-green-500" />

	// 			<p>
	// 				View{' '}
	// 				<Link
	// 					href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
	// 					target="_blank"
	// 					className="text-green-500"
	// 				>
	// 					transaction
	// 				</Link>{' '}
	// 				on block explorer
	// 			</p>
	// 		</div>
	// 	)
	// }

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<Card className="w-fit shadow-ticket-2">
				<CardContent className="flex flex-col mt-5 gap-4">
					<Image
						src={ticket.image}
						alt=""
						width={300}
						height={150}
						style={{ objectFit: 'cover', borderRadius: '15px', aspectRatio: '2' }}
					/>
					<div className="mt-3">
						<h3 className="text-lg font-bold">{`#${ticket.tokenId} - ${ticket.name}`}</h3>
						<p>{ticket.description}</p>
					</div>
				</CardContent>
				<CardFooter className="w-full flex justify-between">
					<Button variant="outline" className="border-neutral-700 pointer-events-none cursor-none">
						Amount: {ticket.amount}
					</Button>
					<DialogTrigger asChild>
						<Button>Transfer</Button>
					</DialogTrigger>
				</CardFooter>
			</Card>
			<DialogContent className="pt-12">
				<Form
					{...form}
					onSubmit={(data: any) => {
						console.log(ticket.tokenId)
						console.log(address)
						console.log(data.amount)
						write({
							args: [address, ticket.tokenId, data.amount],
						})
						// write({
						// 	args: [
						// 		`0x${process.env.NEXT_PUBLIC_MSICAL_COLLECTION}`,
						// 		ticket.eventId,
						// 		ticket.tokenId,
						// 		data.amount,
						// 	],
						// 	value: BigInt(data.amount) * BigInt(ticket.price),
						// })
					}}
				>
					<Card>
						<CardContent>
							<FormField
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<>
												<FormLabel>{'Amount'}</FormLabel>
												<Input {...field} />
											</>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="justify-end space-x-2">
							<Button type="button" variant="ghost" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button>Confirm</Button>
						</CardFooter>
					</Card>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default TicketCard
