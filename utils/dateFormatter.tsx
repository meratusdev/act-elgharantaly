import { format } from "date-fns";
import { id } from "date-fns/locale";

/**
 * @param date: string | null | undefined
 * @param structure: "d MMMM yyyy"
 * @return string | null
 *
 * @example
 * dateFormatter("2021-08-01T00:00:00.000Z", "d MMMM yyyy")
 * // 1 Agustus 2021
 */
const dateFormatter = (
  date: string | null | undefined,
  structure: "d MMMM yyyy",
) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), structure, { locale: id });
};

export default dateFormatter;
