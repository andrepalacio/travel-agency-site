import 'dotenv/config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

const ADMIN_EMAIL = 'admin@expery.com';
const ADMIN_PASSWORD = 'admin123';

async function main() {
  console.log('🔄 Checking for existing admin user...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`✅ Admin user already exists: ${existingAdmin.email}`);
    console.log(`   ID: ${existingAdmin.id}`);
    console.log(`   Rol: ${existingAdmin.rol}`);
    return;
  }

  console.log('🔄 Creating admin user...');

  const hashedPassword = await hashPassword(ADMIN_PASSWORD);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      last_name: 'Expery',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      rol: 'ADMIN',
      isActive: true,
    },
  });

  console.log(`✅ Admin user created successfully!`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   ID: ${admin.id}`);
  console.log(`   Rol: ${admin.rol}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error creating admin user:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
