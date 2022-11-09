export interface BookScheduleByCompanyBody {
  scheduleId: number,
  message: string,
  sportType: number,
  refereeType: number,
  companyEventId: number | null,
}