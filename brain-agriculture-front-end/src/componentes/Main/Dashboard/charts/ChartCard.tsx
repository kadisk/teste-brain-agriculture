import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import {
    Card
} from 'react-bootstrap'

const ChartCard = ({title, aggregate}:any) => {

    const createData = () => {
        return {
            labels: Object.keys(aggregate),
            datasets: [
                {
                    data: Object.values(aggregate),
                    borderWidth: 1,
                }
            ]
        }
    }

    return <Card className="text-center" style={{width:"450px"}}>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <Pie data={createData()} />
            </Card.Body>
        </Card>
}

export default ChartCard