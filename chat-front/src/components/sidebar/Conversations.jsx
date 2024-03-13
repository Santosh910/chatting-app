import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { getRandomEmoji } from '../../utils/emojis'
// import toast from "react-hot-toast";
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log("data here", conversations)



	return (
		<div className='py-2 flex flex-col overflow-auto'>

		
				{conversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={idx === conversations.length - 1}
					/>

					))}
				
					
						{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
					

				

			




		</div>



	);

};
export default Conversations;


