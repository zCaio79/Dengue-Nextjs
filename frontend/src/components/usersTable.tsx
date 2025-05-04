import { CircleMinus, CirclePlus, Hospital, User2 } from "lucide-react";

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
        <div className="flex w-full h-full bg-zinc-100 border-2 py-4 px-4 rounded-lg overflow-y-scroll">
            <table className="w-full border-collapse text-zinc-900 font-robotoMono md:px-6">
                <thead>
                    <tr className="text-xs md:text-sm">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Perm</th>
                        <th className="text-right p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className={`border-b border-zinc-500 text-xs font-medium px-2 text-zinc-800 ${!user.active ? ' saturate-0 opacity-70' : 'opacity-100'}`} key={user.id}>
                            <td className="p-2">{user.id}</td>
                            <td className="flex gap-2 itens-center text-center p-2">
                                <p className="flex self-center">
                                    {user.permission == 1 ? <User2 className="w-5 h-5" /> : <Hospital className="w-5 h-5 text-emerald-600" />}
                                </p>
                                <p className="flex self-center">{user.name}</p>
                            </td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.permission}</td>
                            <td className="p-2 flex justify-end items-center">
                                <button
                                    type="button"
                                    title={user.active ? "Inativar" : "Ativar"}
                                    className="flex items-center justify-center">
                                    {!user.active ? <CirclePlus className="size-5" /> : <CircleMinus className="size-5 text-red-400" />}
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
