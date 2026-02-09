import { useSelector } from "react-redux";
import { selectCurrentServerUsers } from "@/redux/selectors";
import { getNameInitials, groupIntoRoles } from "@/lib/utils";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersList = () => {
  const users = useSelector(selectCurrentServerUsers);
  const groupedUsers = useMemo(() => groupIntoRoles(users), [users]);
  return (
    <div className="bg-zinc-800 h-full p-4 pt-6 flex flex-col gap-4">
        {groupedUsers.map((roleGroup) => (
            <div key={roleGroup.role.id} className="flex flex-col gap-2">
                <h3 className="text-xs uppercase text-zinc-400 font-medium tracking-wider">{roleGroup.role.name} - {roleGroup.users.length}</h3>
                <div className="flex flex-col gap-2">
                {roleGroup.users.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-700">
                            <Avatar className="size-10">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{getNameInitials(user.username)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div style={{ color: roleGroup.role.color }} className="text-white font-medium">{user.username}</div>
                    </div>
                ))}
                </div>
            </div>
        ))}
    </div>
  )
}

export default UsersList