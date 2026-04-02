import { listUsers } from "@/lib/actions/users";
import UsersAdminClient from "./UsersAdminClient";

export default async function AdminUsersPage() {
  const result = await listUsers();
  const users = result.success ? result.users : [];

  return <UsersAdminClient users={users} />;
}
