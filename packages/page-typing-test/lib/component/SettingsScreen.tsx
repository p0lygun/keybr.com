import { Screen } from "@keybr/pages-shared";
import { Button, Field, FieldList, Icon } from "@keybr/widget";
import { mdiCheckCircle } from "@mdi/js";
import { Component, type ReactNode } from "react";
import { type CompositeSettings, SettingsEditor } from "./settings/index.ts";

type Props = {
  readonly defaultSettings: CompositeSettings;
  readonly onSubmit: (settings: CompositeSettings) => void;
};

type State = {
  readonly settings: CompositeSettings;
};

export class SettingsScreen extends Component<Props, State> {
  override state: State = {
    settings: { ...this.props.defaultSettings },
  };

  override render(): ReactNode {
    const { onSubmit } = this.props;
    const { settings } = this.state;
    return (
      <Screen>
        <SettingsEditor
          settings={settings}
          patchSettings={(settings) => {
            this.setState({ settings });
          }}
        />

        <FieldList>
          <Field.Filler />
          <Field>
            <Button
              icon={<Icon shape={mdiCheckCircle} />}
              label="Done"
              title="Save settings and return to the test."
              onClick={() => {
                onSubmit(settings);
              }}
            />
          </Field>
        </FieldList>
      </Screen>
    );
  }
}
