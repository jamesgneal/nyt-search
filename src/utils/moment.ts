import moment from "moment-timezone";

export const formatWithMoment = (timestamp: string) => {
  const FIJI_TIME_ZONE = {
    LONG: "Pacific/Fiji",
    ABBR: "FJT",
  };
  const pubTime = moment(timestamp)
    .tz(FIJI_TIME_ZONE.LONG)
    .format("M/DD/YYYY h:mm A");
  /**
   * MomentJS does not guarantee the "z" token will return the abbreviated time zone, only the UTC offset number.
   * Since we are always going to return Fuji Standard Time, the FJT abbreviation is hard-coded.
   */
  const pubTimeWithAbbr = `${pubTime} ${FIJI_TIME_ZONE.ABBR}`;
  return pubTimeWithAbbr;
};
