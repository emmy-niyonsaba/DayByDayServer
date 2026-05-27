import sequelize from "../Config/db.js";
import UserCategory from "../models/userCategory.js";
import User from "../models/user.js";
import UserRate from "../models/userRates.js";
import Attendance from "../models/attendance.js";
import Discipline from "../models/discipline.js";
import Loan from "../models/loan.js";
import Permission from "../models/permissions.js";
import Salary from "../models/salary.js";

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const categories = await UserCategory.bulkCreate(
      [
        { category_name: "admin" },
        { category_name: "supervisor" },
        { category_name: "manpower" },
        { category_name: "contractor" },
      ],
      { returning: true },
    );

    const users = await User.bulkCreate(
      [
        {
          username: "admin01",
          name: "System Admin",
          email: "admin@daybyday.local",
          password: "admin123",
          telephone: "0911000001",
          category_id: categories[0].id,
          is_active: true,
        },
        {
          username: "supervisor01",
          name: "Site Supervisor",
          email: "supervisor@daybyday.local",
          password: "supervisor123",
          telephone: "0911000002",
          category_id: categories[1].id,
          is_active: true,
        },
        {
          username: "worker01",
          name: "Daily Worker",
          email: "worker@daybyday.local",
          password: "worker123",
          telephone: "0911000003",
          category_id: categories[2].id,
          is_active: true,
        },
      ],
      { returning: true },
    );

    await UserRate.bulkCreate([
      {
        user_id: users[0].id,
        rate: 300,
        payment_type: "monthly",
      },
      {
        user_id: users[1].id,
        rate: 220,
        payment_type: "monthly",
      },
      {
        user_id: users[2].id,
        rate: 25,
        payment_type: "daily",
      },
    ]);

    await Attendance.bulkCreate([
      {
        user_id: users[2].id,
        attendance: "full_day",
      },
      {
        user_id: users[1].id,
        attendance: "partial",
      },
    ]);

    await Discipline.bulkCreate([
      {
        title: "Late arrival warning",
        description: "First warning for arriving late to the morning shift.",
        attachment: null,
        user_id: users[2].id,
      },
    ]);

    await Loan.bulkCreate([
      {
        user_id: users[2].id,
        amount: 500,
        reason: "Transport support",
        is_paid: false,
      },
    ]);

    await Permission.bulkCreate([
      {
        leave_time: new Date("2026-05-20T08:00:00.000Z"),
        return_time: new Date("2026-05-20T12:00:00.000Z"),
        title: "Medical visit",
        status: "approved",
        description: "Approved half-day leave for a clinic appointment.",
        user_id: users[2].id,
      },
    ]);

    await Salary.bulkCreate([
      {
        user_id: users[2].id,
        month: 5,
        year: 2026,
        total_amount: 750,
        total_loans: 500,
        final_amount: 250,
      },
    ]);

    console.log("Database seeded successfully.");
    await sequelize.close();
  } catch (error) {
    console.error("Database seed failed:", error);
    await sequelize.close();
    process.exit(1);
  }
};

seed();
