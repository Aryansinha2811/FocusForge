import { Sidebar } from "./Sidebar"

export default function Dashboard(){
    return(
        
        <div>
            <Sidebar />
            <div className="ml-64 p-8">
                <h1 className="text-3xl font-hero font-bold mb-4">Dashboard</h1>
                {/* Main dashboard content goes here */}
            </div>
        </div>
    )
}