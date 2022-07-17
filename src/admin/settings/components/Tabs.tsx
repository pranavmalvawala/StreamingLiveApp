import { Icon } from "@mui/material";
import React from "react";
import { DisplayBox, TabEdit, LinkInterface, ApiHelper, UserHelper } from ".";
import { Loading, SmallButton } from "../../../appBase/components";
import SvgIcon from "@mui/material/SvgIcon";
import * as muiIcons from "@mui/icons-material";

export const Tabs: React.FC = () => {
  const [tabs, setTabs] = React.useState<LinkInterface[]>([]);
  const [currentTab, setCurrentTab] = React.useState<LinkInterface>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleUpdated = () => { setCurrentTab(null); loadData(); }
  const getEditContent = () => <SmallButton icon="add" text="Add" onClick={handleAdd} />
  const loadData = () => { ApiHelper.get("/links?category=tab", "StreamingLiveApi").then(data => { setTabs(data); setIsLoading(false); }); }
  const saveChanges = () => { ApiHelper.post("/links", tabs, "StreamingLiveApi").then(loadData); }

  const handleAdd = () => {
    let tab: LinkInterface = { churchId: UserHelper.currentChurch.id, sort: tabs.length, text: "", url: "", icon: "link", linkData: "", linkType: "url", category: "tab" }
    setCurrentTab(tab);
  }

  const makeSortSequential = () => {
    for (let i = 0; i < tabs.length; i++) tabs[i].sort = i + 1;
  }

  const moveUp = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx - 1].sort++;
    tabs[idx].sort--;
    saveChanges();
  }

  const moveDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx].sort++;
    tabs[idx + 1].sort--;
    saveChanges();
  }

  const getRows = () => {
    let idx = 0;
    let rows: JSX.Element[] = [];
    tabs.forEach(tab => {
      const upLink = (idx === 0) ? null : <a href="about:blank" data-idx={idx} onClick={moveUp}><Icon>arrow_upward</Icon></a>
      const downLink = (idx === tabs.length - 1) ? null : <a href="about:blank" data-idx={idx} onClick={moveDown}><Icon>arrow_downward</Icon></a>
      rows.push(
        <tr key={idx}>
          <td><a href={tab.url}><SvgIcon sx={{marginRight: "5px"}} component={(muiIcons as any)[tab.icon]}></SvgIcon>{tab.text}</a></td>
          <td style={{textAlign: "right"}}>
            {upLink}
            {downLink}
            <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentTab(tab); }}><Icon>edit</Icon></a>
          </td>
        </tr>
      );
      idx++;
    })
    return rows;
  }

  const getTable = () => {
    if (isLoading) return <Loading />
    else return (<table className="table">
      <tbody>
        {getRows()}
      </tbody>
    </table>);
  }

  React.useEffect(() => { loadData(); }, []);

  if (currentTab !== null) return <TabEdit currentTab={currentTab} updatedFunction={handleUpdated} />;
  else return (
    <DisplayBox headerIcon="folder" headerText="Sidebar Tabs" editContent={getEditContent()}>
      {getTable()}
    </DisplayBox>

  );

}
