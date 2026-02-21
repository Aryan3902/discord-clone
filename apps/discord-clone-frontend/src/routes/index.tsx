import { createFileRoute } from "@tanstack/react-router";
import { TEST_MESSAGE } from "@discord-clone/shared-types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1>{TEST_MESSAGE}</h1>
      <h3>Welcome Home!</h3>
    </div>
  );
}
