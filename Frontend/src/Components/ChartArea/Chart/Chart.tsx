import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { Container } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) =>
        setVacations(
          vacations.filter((v) => {
            return v.followersCount > 0;
          })
        )
      )
      .catch((err) => notifyService.error(err));
  }, []);

  const labels = vacations.map((v) => v.destination);
  const data1 = vacations.map((v) => v.followersCount);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Vacation",
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="Chart-Background">
      <Container className="Chart">
        <Bar options={options} data={data} />
      </Container>
    </div>
  );
}

export default Chart;
