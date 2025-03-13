import UsersTable from "@/components/usersTable";

type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
    permission: number;
};

type Users = User[];

export default function Admin() {
    const users: Users = [

        { id: 1, name: "Alice Silva", email: "alice@example.com", permission: 2, active: true },
        { id: 2, name: "Bruno Souza", email: "bruno@example.com", permission: 1, active: false },
        { id: 3, name: "Carla Mendes", email: "carla@example.com", permission: 3, active: true },
        { id: 4, name: "Daniel Rocha", email: "daniel@example.com", permission: 2, active: false },
        { id: 5, name: "Eduarda Lima", email: "eduarda@example.com", permission: 1, active: true },
        { id: 6, name: "Alice Silva", email: "alice@example.com", permission: 3, active: false },
        { id: 7, name: "Bruno Souza", email: "bruno@example.com", permission: 1, active: true },
        { id: 8, name: "Carla Mendes", email: "carla@example.com", permission: 2, active: false },
        { id: 9, name: "Daniel Rocha", email: "daniel@example.com", permission: 3, active: true },
        { id: 10, name: "Eduarda Lima", email: "eduarda@example.com", permission: 1, active: false },
        { id: 11, name: "Alice Silva", email: "alice@example.com", permission: 2, active: true },
        { id: 12, name: "Bruno Souza", email: "bruno@example.com", permission: 3, active: false },
        { id: 13, name: "Carla Mendes", email: "carla@example.com", permission: 1, active: true },
        { id: 14, name: "Daniel Rocha", email: "daniel@example.com", permission: 2, active: false },
        { id: 15, name: "Eduarda Lima", email: "eduarda@example.com", permission: 3, active: true }


    ];

    return (
        <div className="text-white px-6 pt-6 pb-3 gap-4 flex min-h-screen flex-col w-full justify-center
         items-center bg-zinc-900 md:h-screen">
            <main className="flex w-full h-full justify-center p-0 md:p-8">
                <UsersTable users={users} />
            </main>
        </div>
    );
}
