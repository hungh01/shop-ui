import { useEffect, useState } from "react";
import SalesChart from "./SaleChart";
import { API_URL } from "@/utils/api";
import CardList from "./CardList";

export default function Dashboard() {
    const [data, setData] = useState<{ name: string, sales: number }[]>([]);
    const [type, setType] = useState<string>("daily");
    console.log("type", type);
    useEffect(() => {
        const fetchData = async () => {
            // Simulate fetching data from an API
            const response = await fetch(`${API_URL}/order/revenue?type=${type}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            ); // Replace with your API endpoint
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, [type]);


    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ height: '400px', width: '100%' }}>
                <SalesChart data={data} setType={setType} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', textAlign: 'center' }}>
                    <CardList />
                </div>
            </div>
        </div>
    );
}