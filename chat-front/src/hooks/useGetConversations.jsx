import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await axios.get("/api/users");
				// const data = await res.json();
				// if (data.error) {
				// 	throw new Error(data.error);
				// }
				setConversations(res.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;