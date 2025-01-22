import { Button, FrameContext, Frog } from "frog";
import { neynar } from "frog/hubs";
import { firefly, recaster, supercast, vasco } from "./lib/deeplink";

export const app = new Frog({
  hub: neynar({ apiKey: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" }),
  title: "FC Alt Client Redirect",
  verify: true,
});

app.frame("/", (c: FrameContext
) => {
  return c.res({
    image: "https://r2.fc-clients-cast-action.artlu.xyz/frame.png",
    intents: [
      <Button.AddCastAction action="/action-frame">
        Add Redirect Action
      </Button.AddCastAction>,
      <Button value="cpanel" action="/cpanel">
        🎛️ Controls
      </Button>,
    ],
  });
});

app.castAction(
  "/action-frame",
  (c: FrameContext) => {
    return c.res({ type: "frame", path: "/redirect" });
  },
  {
    name: "FC Alt Client Redirect",
    icon: "link-external",
    description: "View any cast in an alternative Farcaster client",
    aboutUrl: "https://farcaster.id/artlu",
  }
);

app.frame("/redirect", (c: FrameContext) => {
  const { verified, frameData } = c;

  if (verified && frameData) {
    const { fid: castFid, hash: castHash } = frameData.castId;
    console.log(`${frameData.fid} asked to redirect ${castFid}:${castHash}`);

    const sc = supercast(castHash);
    const rc = recaster(castHash);
    const ff = firefly(castHash);
    const vw = vasco(castHash);

    return c.res({
      image: "https://r2.fc-clients-cast-action.artlu.xyz/ephemeral-frame.png",
      intents: [
        <Button.Link href={sc}>Supercast</Button.Link>,
        <Button.Link href={rc}>Recaster</Button.Link>,
        <Button.Link href={ff}>Firefly</Button.Link>,
        <Button.Link href={vw}>Vasco</Button.Link>,
      ],
    });
  } else
    return c.res({
      image: "https://r2.fc-clients-cast-action.artlu.xyz/redirect-error.png",
    });
});

app.frame("cpanel", (c: FrameContext) => {
  const { verified } = c;

  if (verified) {
    return c.res({
      image: "https://r2.fc-clients-cast-action.artlu.xyz/cpanel.png",
      intents: [<Button.Reset>Check Back 🔜</Button.Reset>],
    });
  } else {
    return c.error({ message: "Unauthorized" });
  }
});

export default app;
