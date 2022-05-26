import React from "react";
import { makeStyles } from "../../common/hooks/make_styles";
import { getRandomId } from "../../common/utils/random_id";
import { Choice, Moment } from "../../domain/adventure_domain/types";
import { NetworkDomain } from "../../domain/network_domain/network_domain";
import AdventureEditorDomainProvider, {
  useAdventureEditorDomain,
} from "../../providers/adventure_editor_domain_provider";
import { Button } from "../common/Button";
import { Network } from "../network/Network";
import { renderChoiceView } from "./ChoiceView";
import { renderMomentView } from "./MomentView";

export const AdventureEditor = () => {
  const networkDomain = new NetworkDomain<Moment, Choice>();
  return (
    <AdventureEditorDomainProvider networkDomain={networkDomain}>
      <Network
        domain={networkDomain}
        renderNode={renderMomentView}
        renderConnection={renderChoiceView}
      >
        <AdventureEditorContent />
      </Network>
    </AdventureEditorDomainProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: 0,
    left: "50%",
  },
}));

const AdventureEditorContent = () => {
  const domain = useAdventureEditorDomain();
  const styles = useStyles();

  return (
    <Button
      style={styles.button}
      onClick={() =>
        domain.addMoment({
          title: "New Moment",
          id: getRandomId(),
          description: "New Description",
          choices: [],
        })
      }
    >
      Add
    </Button>
  );
};
