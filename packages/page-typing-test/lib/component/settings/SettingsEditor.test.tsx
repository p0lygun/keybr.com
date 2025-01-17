import { FakeIntlProvider } from "@keybr/intl";
import { FakePhoneticModel } from "@keybr/phonetic-model";
import { PhoneticModelLoader } from "@keybr/phonetic-model-loader";
import { fireEvent, render } from "@testing-library/react";
import test from "ava";
import { type ReactNode, useState } from "react";
import { defaultSettings, SettingsEditor } from "./SettingsEditor.tsx";

test("render", async (t) => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <TestClient />
    </FakeIntlProvider>,
  );

  fireEvent.click(r.getByText("Text"));
  await r.findByText("Text Settings");

  fireEvent.click(r.getByText("Common words", { selector: "span" }));
  fireEvent.click(r.getByText("Pseudo words", { selector: "span" }));
  fireEvent.click(r.getByText("Book paragraphs", { selector: "span" }));

  fireEvent.click(r.getByText("Typing"));
  await r.findByText("Typing Options");

  fireEvent.click(r.getByText("Stop the cursor when an error occurs."));
  fireEvent.click(r.getByText("Forgive errors."));

  fireEvent.click(r.getByText("No whitespace"));
  fireEvent.click(r.getByText("Bar whitespace"));
  fireEvent.click(r.getByText("Bullet whitespace"));

  fireEvent.click(r.getByText("Block cursor"));
  fireEvent.click(r.getByText("Box cursor"));
  fireEvent.click(r.getByText("Line cursor"));
  fireEvent.click(r.getByText("Underline cursor"));

  fireEvent.click(r.getByText("Jumping cursor"));
  fireEvent.click(r.getByText("Smooth cursor"));

  t.pass();

  r.unmount();
});

function TestClient(): ReactNode {
  const [settings, setSettings] = useState({ ...defaultSettings });
  return (
    <SettingsEditor
      settings={settings}
      patchSettings={(newSettings) => {
        setSettings({ ...newSettings });
      }}
    />
  );
}
