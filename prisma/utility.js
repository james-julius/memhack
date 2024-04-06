const { PrismaClient } = require('@prisma/client');

// Instantiate Prisma Client
const prisma = new PrismaClient();

async function deleteUserByEmail(email) {
  try {
    // Connect to the database
    await prisma.$connect();

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      // Delete the user (cascading deletes will handle related records)
      const deletedUser = await prisma.user.delete({
        where: { email: email },
      });

      console.log(`User with email ${email} has been deleted.`);
      return deletedUser;
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

const userEmailToDelete = 'fanli@christianfanli.org';

deleteUserByEmail(userEmailToDelete).catch((e) => {
  console.error(e);
  process.exit(1);
});