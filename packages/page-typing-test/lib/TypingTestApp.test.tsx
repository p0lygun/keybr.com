import { FakeIntlProvider } from "@keybr/intl";
import { FakePhoneticModel } from "@keybr/phonetic-model";
import { PhoneticModelLoader } from "@keybr/phonetic-model-loader";
import { fireEvent, render } from "@testing-library/react";
import test from "ava";
import { TypingTestApp } from "./TypingTestApp.tsx";

test("render", async (t) => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <TypingTestApp />
    </FakeIntlProvider>,
  );

  fireEvent.click(await r.findByText("Settings..."));
  fireEvent.click(await r.findByText("Done"));

  t.pass();

  r.unmount();
});
