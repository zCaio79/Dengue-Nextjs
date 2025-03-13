import { CircleCheck, CircleMinus } from "lucide-react";

type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
    permission: number;
};

type Users = User[];

type UsersTableProps = {
    users: Users;
};

export default function UsersTable({ users }: UsersTableProps) {
    return (
        <div className="w-full bg-zinc-100 border-2 py-4 px-6 rounded-lg overflow-scroll">
            <table className="w-full border-collapse text-zinc-900 font-robotoMono">
                <thead>
                    <tr>
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Perm</th>
                        <th className="text-right p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className={`border-b border-zinc-500 text-sm font-medium px-2 gap-8 ${!user.active ? 'opacity-70' : 'opacity-100'}`} key={user.id}>
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.permission}</td>
                            <td className="p-2 flex justify-end">
                                <button
                                    type="button"
                                    title={user.active ? "Inativar" : "Ativar"}
                                    className="flex items-center justify-center">
                                        {!user.active ? <CircleMinus className="w-5 h-5" /> : <CircleCheck className="w-5 h-5" />}
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center">
                                        {!user.active ? <CircleMinus className="w-5 h-5" /> : <CircleCheck className="w-5 h-5" />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
