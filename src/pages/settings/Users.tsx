
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockUsersRoles = [
  {
    id: "USR001",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Admin",
    created_at: "2025-03-11",
    status: "active",
  },
  {
    id: "USR002",
    name: "Sam Smith",
    email: "sam@biz.com",
    role: "Staff",
    created_at: "2025-04-03",
    status: "inactive",
  },
];

export default function UsersRoles() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users &amp; Roles</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsersRoles.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className={user.status === "active" ? "text-green-700" : "text-gray-500"}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{user.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
