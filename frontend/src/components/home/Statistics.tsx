import Container from "@/components/layout/Container";
import { statistics } from "@/data/statistics";

export default function Statistics() {
  return (
    <section className="border-b border-paper-line bg-white py-14">
      <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {statistics.map((stat) => (
          <div key={stat.id} className="text-center md:text-left">
            <p className="text-4xl font-extrabold text-primary sm:text-5xl">
              {stat.value}
              <span>{stat.suffix}</span>
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
