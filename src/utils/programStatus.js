export const isRegistrationOpen = (programConfig) => {
  if (programConfig?.sessionStatus !== "announced") return false;
  if (!programConfig?.classStartAt) return false;

  const classStartDate = new Date(programConfig.classStartAt);
  if (Number.isNaN(classStartDate.getTime())) return false;

  return new Date() < classStartDate;
};

export const isWaitlistMode = (programConfig) => {
  return !isRegistrationOpen(programConfig);
};

export const getPrimaryCtaText = (programConfig) => {
  return isRegistrationOpen(programConfig) ? "Register Here" : "Join Waitlist";
};

export const getSectionCtaText = (programConfig, fallback = "Register Now") => {
  return isRegistrationOpen(programConfig) ? fallback : "Join Waitlist";
};

export const getSessionDisplay = (programConfig) => {
  if (!isRegistrationOpen(programConfig)) return "Next Batch Announcement Coming Soon";

  return programConfig?.sessionStatus === "announced" && programConfig?.date
    ? `${programConfig.date} - ${programConfig.time}`
    : "Next Batch Announcement Coming Soon";
};

export const getMarqueeText = (programConfig) => {
  if (isRegistrationOpen(programConfig)) {
    return `🚀 ${programConfig?.name || "AIBE Weekend Batch"} – ${programConfig?.date || "Upcoming Batch"} | ${programConfig?.duration || "20 Hours"} Intensive Training + Test Questions | Learn Smarter, Practice Better, Clear Faster! 🎯`;
  }
  return `🚀 ${programConfig?.name || "AIBE Masterclass"} – Next Batch Announcement Coming Soon | Join the Waitlist to Get Early Access & Notifications! 🎯`;
};

export const getProgramDate = (programConfig) => {
  return isRegistrationOpen(programConfig) && programConfig?.date
    ? programConfig.date
    : "TBA";
};

export const getProgramStartDate = (programConfig) => {
  return isRegistrationOpen(programConfig)
    ? programConfig?.startDate || programConfig?.date || "TBA"
    : "TBA";
};

export const getProgramEndDate = (programConfig) => {
  return isRegistrationOpen(programConfig)
    ? programConfig?.endDate || programConfig?.date || "TBA"
    : "TBA";
};
