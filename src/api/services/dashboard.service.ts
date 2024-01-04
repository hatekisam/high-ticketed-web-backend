import { Account, User } from "../models";

const getStats = async () => {
  const staffCount = await Account.countDocuments({ role: "EMPLOYEE" });
  const tradePersonCount = await User.countDocuments({
    profile: { $exists: true },
  });
  const clientCount = await User.countDocuments({
    profile: { $exists: false },
  });
  const profit = 0;

  return [
    { name: "Clients", stat: clientCount },
    { name: "Staffs", stat: staffCount },
    { name: "Tradepersons", stat: tradePersonCount },
    { name: "Profit", stat: profit },
  ];
};

export default {
  getStats,
};
