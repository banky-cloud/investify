import { Card } from "react-bootstrap";

export default function DashboardCard({ title, value }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-muted">{title}</Card.Title>
        <h3>{value}</h3>
      </Card.Body>
    </Card>
  );
}