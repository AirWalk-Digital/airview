import React from "react";

export default {
  title: "Test Story",
  component: TestComponent,
};

function TestComponent() {
  return <div>Test</div>;
}

export const TestStory = () => <TestComponent />;
