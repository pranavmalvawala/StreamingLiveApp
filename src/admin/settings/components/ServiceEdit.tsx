import { Grid, InputLabel, MenuItem, Select, TextField, FormControl, SelectChangeEvent } from "@mui/material";
import React from "react";
import { AdminServiceInterface, ApiHelper, InputBox, Duration } from ".";
import { DateHelper, UniqueIdHelper } from "../../../helpers";

interface Props { currentService: AdminServiceInterface, updatedFunction?: () => void }

export const ServiceEdit: React.FC<Props> = (props) => {
  const [currentService, setCurrentService] = React.useState<AdminServiceInterface>(null);
  const checkDelete = () => { if (!UniqueIdHelper.isMissing(currentService?.id)) return handleDelete; else return null; }
  const handleCancel = () => { props.updatedFunction(); }

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this service?")) {
      ApiHelper.delete("/services/" + currentService.id, "StreamingLiveApi").then(() => { setCurrentService(null); props.updatedFunction(); });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const val = e.target.value;
    let s = { ...currentService };
    switch (e.target.name) {
      case "serviceLabel": s.label = val; break;
      case "serviceTime":
        const date = new Date(val);
        s.serviceTime = date;
        break;
      case "chatBefore": s.chatBefore = parseInt(val) * 60; break;
      case "chatAfter": s.chatAfter = parseInt(val) * 60; break;
      case "provider": s.provider = val; break;
      case "providerKey":
        s.providerKey = val;
        if (s.provider === "youtube_live" || s.provider === "youtube_watchparty") s.providerKey = getYouTubeKey(s.providerKey);
        else if (s.provider === "facebook_live") s.providerKey = getFacebookKey(s.providerKey);
        else if (s.provider === "vimeo_live" || s.provider === "vimeo_watchparty") s.providerKey = getVimeoKey(s.providerKey);
        break;
      case "recurs": s.recurring = val === "true"; break;
    }
    setCurrentService(s);
  }

  //auto fix common bad formats.
  const getVimeoKey = (facebookInput: string) => {
    let result = facebookInput.split("&")[0];
    result = result
      .replace("https://vimeo.com/", "")
      .replace("https://player.vimeo.com/video/", "")
    return result;
  }

  //auto fix common bad formats.
  const getFacebookKey = (facebookInput: string) => {
    let result = facebookInput.split("&")[0];
    result = result
      .replace("https://facebook.com/video.php?v=", "")
    return result;
  }

  //auto fix common bad formats.
  const getYouTubeKey = (youtubeInput: string) => {
    let result = youtubeInput.split("&")[0];
    result = result
      .replace("https://www.youtube.com/watch?v=", "")
      .replace("https://youtube.com/watch?v=", "")
      .replace("https://youtu.be/", "")
      .replace("https://www.youtube.com/embed/", "")
      .replace("https://studio.youtube.com/video/", "")
      .replace("/edit", "");
    return result;
  }

  const handleSave = () => {
    setVideoUrl();
    ApiHelper.post("/services", [currentService], "StreamingLiveApi").then(props.updatedFunction);
  }

  const setVideoUrl = () => {
    let result = currentService?.providerKey;
    switch (currentService?.provider) {
      case "youtube_live":
      case "youtube_watchparty":
        result = "https://www.youtube.com/embed/" + currentService?.providerKey + "?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1";
        break;
      case "vimeo_live":
      case "vimeo_watchparty":
        result = "https://player.vimeo.com/video/" + currentService?.providerKey + "?autoplay=1";
        break;
      case "facebook_live":
        result = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideo.php%3Fv%3D" + currentService?.providerKey + "&show_text=0&autoplay=1&allowFullScreen=1";
        break;
    }
    return currentService.videoUrl = result;
  }

  React.useEffect(() => { setCurrentService(props.currentService); }, [props.currentService]);

  let keyLabel = <>Video Embed Url</>;
  let keyPlaceholder = "https://yourprovider.com/yoururl/"

  switch (currentService?.provider) {
    case "youtube_live":
    case "youtube_watchparty":
      keyLabel = <>YouTube ID <span className="description" style={{ float: "right", marginTop: 3, paddingLeft: 5 }}>https://youtube.com/watch?v=<b style={{ color: "#24b8ff" }}>abcd1234</b></span></>;
      keyPlaceholder = "abcd1234";
      break;
    case "vimeo_live":
    case "vimeo_watchparty":
      keyLabel = <>Vimeo ID <span className="description" style={{ float: "right", marginTop: 3, paddingLeft: 5 }}>https://vimeo.com/<b>123456789</b></span></>;
      keyPlaceholder = "123456789";
      break;
    case "facebook_live":
      keyLabel = <>Video ID <span className="description" style={{ float: "right", marginTop: 3, paddingLeft: 5 }}>https://facebook.com/video.php?v=<b>123456789</b></span></>;
      keyPlaceholder = "123456789";
      break;
  }

  let localServiceTime = currentService?.serviceTime;

  let videoStartTime = currentService?.serviceTime?.getTime() - currentService?.earlyStart * 1000;
  let videoEndTime = currentService?.serviceTime?.getTime() + currentService?.duration * 1000;
  let chatAndPrayerStartTime = currentService?.serviceTime?.getTime() - currentService?.chatBefore * 1000;
  let chatAndPrayerEndTime = currentService?.serviceTime?.getTime() + currentService?.chatAfter * 1000;
  return (
    <InputBox headerIcon="calendar_month" headerText="Edit Service" saveFunction={handleSave} cancelFunction={handleCancel} deleteFunction={checkDelete()}>
      <>
        <TextField fullWidth label="Service Name" name="serviceLabel" value={currentService?.label || ""} onChange={handleChange} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField fullWidth label="Service Time" type="datetime-local" name="serviceTime" InputLabelProps={{ shrink: !!DateHelper.formatHtml5DateTime(localServiceTime) }} defaultValue={DateHelper.formatHtml5DateTime(localServiceTime)} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Recurs Weekly</InputLabel>
              <Select label="Recurs Weekly" name="recurs" value={Boolean(currentService?.recurring).toString() || ""} onChange={handleChange}>
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>

            <label style={{ width: "100%" }}>Total Service Duration <span className="description" style={{ float: "right", marginTop: "5px" }}>{DateHelper.formatHtml5Time(new Date(videoStartTime))} - {DateHelper.formatHtml5Time(new Date(videoEndTime))}</span></label>
            <Duration totalSeconds={currentService?.duration} updatedFunction={totalSeconds => { let s = { ...currentService }; s.duration = totalSeconds; setCurrentService(s); }} />

          </Grid>
          <Grid item xs={6}>

            <label style={{ width: "100%" }}>Start Video Early <span className="description" style={{ float: "right", marginTop: "5px" }}>(Optional) For countdowns</span></label>
            <Duration totalSeconds={currentService?.earlyStart} updatedFunction={totalSeconds => { let s = { ...currentService }; s.earlyStart = totalSeconds; setCurrentService(s); }} />

          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField fullWidth label="Enable Chat - Minutes Before" type="number" name="chatBefore" value={currentService?.chatBefore / 60 || ""} onChange={handleChange} InputProps={{
              inputProps: { min: 0, step: 1 },
              endAdornment: <span style={{ whiteSpace: "nowrap" }}>{DateHelper.prettyTime(new Date(chatAndPrayerStartTime))}</span>
            }} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Enable Chat - Minutes After" type="number" name="chatAfter" value={currentService?.chatAfter / 60 || ""} onChange={handleChange} InputProps={{
              inputProps: { min: 0, step: 1 },
              endAdornment: <span style={{ whiteSpace: "nowrap" }}>{DateHelper.prettyTime(new Date(chatAndPrayerEndTime))}</span>
            }} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Video Provider</InputLabel>
              <Select label="Video Provider" name="provider" value={currentService?.provider || ""} onChange={handleChange}>
                <MenuItem value="" disabled>Live Stream</MenuItem>
                <MenuItem value="youtube_live">YouTube (Live)</MenuItem>
                <MenuItem value="vimeo_live">Vimeo (Live)</MenuItem>
                <MenuItem value="facebook_live">Facebook (Live)</MenuItem>
                <MenuItem value="custom_live">Custom Embed Url (Live)</MenuItem>
                <MenuItem value="" disabled>Prerecorded Watchparty</MenuItem>
                <MenuItem value="youtube_watchparty">YouTube (Recorded)</MenuItem>
                <MenuItem value="vimeo_watchparty">Vimeo (Recorded)</MenuItem>
                <MenuItem value="custom_watchparty">Custom Embed Url (Recorded)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label={keyLabel} name="providerKey" value={currentService?.providerKey || ""} onChange={handleChange} placeholder={keyPlaceholder} />
          </Grid>
        </Grid>
      </>
    </InputBox>
  );
}
