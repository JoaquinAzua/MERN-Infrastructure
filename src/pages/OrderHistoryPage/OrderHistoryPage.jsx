import { checkToken } from "../../utilities/users-service"

function OrderHistoryPage(){
    async function handleCheckToken(evt) {
       const expDate = await checkToken();
    }

    return  (
        <>
            <h1>Order History</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
        )
}

export default OrderHistoryPage;