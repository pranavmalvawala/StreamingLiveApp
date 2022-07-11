import React, { useState } from "react";
import { InputBox, LinkInterface, ApiHelper, PageInterface, EnvironmentHelper, ErrorMessages } from ".";
import { FormControl, InputLabel, Select, SelectChangeEvent, TextField, MenuItem, Stack } from "@mui/material";

interface Props { currentTab: LinkInterface, updatedFunction?: () => void }

export const TabEdit: React.FC<Props> = (props) => {
  const [currentTab, setCurrentTab] = useState<LinkInterface>(null);
  const [pages, setPages] = useState<PageInterface[]>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this tab?")) {
      ApiHelper.delete("/links/" + currentTab.id, "StreamingLiveApi").then(() => { setCurrentTab(null); props.updatedFunction(); });
    }
  }

  const checkDelete = currentTab?.id ? handleDelete : undefined;
  const handleCancel = () => { props.updatedFunction(); }
  const loadPages = () => { ApiHelper.get("/pages/", "StreamingLiveApi").then((data: PageInterface[]) => setPages(data)) }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const val = e.target.value;
    let t = { ...currentTab };
    switch (e.target.name) {
      case "text": t.text = val; break;
      case "type": t.linkType = val; break;
      case "page": t.linkData = val; break;
      case "url": t.url = val; break;
    }
    setCurrentTab(t);
  }

  const handleSave = () => {
    let errors: string[] = [];

    if (!currentTab.text) errors.push("Please enter valid text");
    if (currentTab?.linkType === "page" && pages.length === 0) errors.push("No page! Please create one before adding it to tab");
    if (currentTab?.linkType === "url" && !currentTab.url) errors.push("Enter a valid URL");

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (currentTab.linkType === "page") currentTab.url = currentTab.linkData + "?ts=" + new Date().getTime().toString();
    else if (currentTab.linkType !== "url") currentTab.url = "";
    ApiHelper.post("/links", [currentTab], "StreamingLiveApi").then(props.updatedFunction);
  }

  const initIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    let target: any = $(e.currentTarget);
    target.iconpicker()
      .on("change", (e: any) => {
        let t = { ...currentTab };
        t.icon = e.icon;
        setCurrentTab(t);
      });
    target.click();
  }

  const getUrl = () => {
    if (currentTab?.linkType === "url") {
      return (
        <TextField fullWidth label="Url" name="url" type="text" value={currentTab?.url} onChange={handleChange} />
      );
    } else return null;
  }

  const getPage = () => {
    if (currentTab?.linkType === "page") {
      let options: JSX.Element[] = [];
      if (pages === null) loadPages();
      else {
        options = [];
        pages.forEach(page => options.push(<MenuItem value={EnvironmentHelper.Common.ContentRoot + "/" + page.path} key={page.id}>{page.name}</MenuItem>));
        if (currentTab.linkData === "") currentTab.linkData = pages[0]?.path;
      }
      return (
        <FormControl fullWidth>
          <InputLabel id="page">Page</InputLabel>
          <Select labelId="page" label="Page" name="page" value={currentTab?.linkData} onChange={handleChange}>
            {options}
          </Select>
        </FormControl>
      );
    } else return null;
  }

  React.useEffect(() => { setCurrentTab(props.currentTab); }, [props.currentTab]);

  return (
    <InputBox headerIcon="folder" headerText="Edit Tab" saveFunction={handleSave} cancelFunction={handleCancel} deleteFunction={checkDelete}>
      <ErrorMessages errors={errors} />
      <Stack direction="row" pt={2}>
        <TextField fullWidth margin="none" label="Text" name="text" type="text" value={currentTab?.text} onChange={handleChange} />
        <div className="input-group-append">
          <button className="btn btn-secondary iconpicker dropdown-toggle" name="TabIcon" id="TabIcon" data-icon={currentTab?.icon} data-iconset="fontawesome5" onClick={initIcon}>
            <i className={currentTab?.icon}></i>
            <span className="caret"></span>
          </button>
        </div>
        <input type="hidden" asp-for="TabId" />
      </Stack>
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select labelId="type" label="Type" name="type" value={currentTab?.linkType || null} onChange={handleChange}>
          <MenuItem value="url">External Url</MenuItem>
          <MenuItem value="page">Page</MenuItem>
          <MenuItem value="chat">Chat</MenuItem>
          <MenuItem value="prayer">PagPrayere</MenuItem>
        </Select>
      </FormControl>
      {getUrl()}
      {getPage()}
    </InputBox>
  );
}
