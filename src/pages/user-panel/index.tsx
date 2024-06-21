import { DatePicker } from "@mantine/dates";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./userpanel.module.scss";
import Link from "next/link";
import PlanForDay from "~/components/PlanForDay/PlanForDay";
import ClientNavbar from "~/components/ClientNavbar/ClientNavbar";
import { api } from "~/utils/api";
import useAccount from "~/utils/useAccount";

export default function UserPanel() {
  const [value, setValue] = useState<Date>(new Date());
  const [selectedDayId, setSelectedDayId] = useState("");
  const [userId, setUserId] = useState("");
  const { data: plans } = api.example.getDayPlansListByUserId.useQuery({
    id: "clxcg5muz0000stnq73v6i2ip",
  });
  const { data: dayPlan } = api.example.getDayPlanById.useQuery({
    id: selectedDayId,
  });

  return (
    <main className={styles.main}>
      <ClientNavbar />
      <div className={styles.userpanel}>
        <div>
          <DatePicker
            defaultDate={new Date()}
            value={value}
            onChange={(v) => {
              setValue(v);
              const dayId = "";
              plans?.forEach((p) => {
                if (p.date.getDate() === v?.getDate()) {
                  setSelectedDayId(p.id);
                }
              });
            }}
            minDate={plans?.at(0)?.date}
            maxDate={plans?.at(plans.length - 1)?.date}
          />
        </div>
        <div className={styles.instructions}>
          <PlanForDay content={dayPlan?.text ?? ""} />
        </div>
      </div>
    </main>
  );
}
