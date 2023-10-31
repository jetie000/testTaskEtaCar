import CoinPage from "@/components/pageCoin/Coin";

function PageCoin({ params }: { params: { id: string } }) {
    return (
        <main className='main'>
            <CoinPage id={params.id} />
        </main>
    );
}

export default PageCoin;