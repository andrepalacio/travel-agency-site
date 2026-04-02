type UserInfoProps = {
  name: string;
  last_name: string;
  email: string;
  rol: string;
}

export function UserInfo({ user }: { readonly user: UserInfoProps }) {
  return (
    <div className="p-3 bg-white/10 rounded-lg">
      <p className="text-white text-sm font-medium">{user.name} {user.last_name}</p>
      <p className="text-expery-iron text-xs truncate">{user.email}</p>
      <p className="text-classic-gold text-xs uppercase mt-1 font-semibold">{user.rol}</p>
    </div>
  );
}
