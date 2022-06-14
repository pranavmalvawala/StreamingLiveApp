import React from "react";
import { DisplayBox, LinkInterface, LinkEdit, ApiHelper, UserHelper } from "."
import { Loading, SmallButton } from "../../../appBase/components";

export const Links: React.FC = () => {
  const [links, setLinks] = React.useState<LinkInterface[]>([]);
  const [currentLink, setCurrentLink] = React.useState<LinkInterface>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleUpdated = () => { setCurrentLink(null); loadData(); }
  const getEditContent = () => <SmallButton icon="add" text="Add" onClick={handleAdd} />
  const loadData = () => { ApiHelper.get("/links?category=link", "StreamingLiveApi").then(data => { setLinks(data); setIsLoading(false); }); }
  const saveChanges = () => { ApiHelper.post("/links", links, "StreamingLiveApi").then(loadData); }

  const handleAdd = () => {
    let link: LinkInterface = { churchId: UserHelper.currentChurch.id, sort: links.length, text: "", url: "", linkType: "url", linkData: "", category: "link", icon: "" }
    setCurrentLink(link);
  }

  const makeSortSequential = () => {
    for (let i = 0; i < links.length; i++) links[i].sort = i + 1;
  }

  const moveUp = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    links[idx - 1].sort++;
    links[idx].sort--;
    saveChanges();
  }

  const moveDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    links[idx].sort++;
    links[idx + 1].sort--;
    saveChanges();
  }

  const getLinks = () => {
    let idx = 0;
    let rows: JSX.Element[] = [];
    links.forEach(link => {
      const upLink = (idx === 0) ? null : <a href="about:blank" data-idx={idx} onClick={moveUp}><i className="arrow_upward"></i></a>
      const downLink = (idx === links.length - 1) ? null : <a href="about:blank" data-idx={idx} onClick={moveDown}><i className="arrow_downward"></i></a>
      rows.push(
        <tr key={idx}>
          <td><a href={link.url}>{link.text}</a></td>
          <td className="text-right">
            {upLink}
            {downLink}
            <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentLink(link); }}><i className="edit"></i></a>
          </td>
        </tr>
      );
      idx++;
    })
    return rows;
  }

  const getTable = () => {
    if (isLoading) return <Loading />
    else return (<table className="table table-sm">
      <tbody>
        {getLinks()}
      </tbody>
    </table>)
  }
  React.useEffect(() => { loadData(); }, []);

  if (currentLink !== null) return <LinkEdit currentLink={currentLink} updatedFunction={handleUpdated} />;
  else return (
    <DisplayBox headerIcon="link" headerText="Header Links" editContent={getEditContent()}>
      {getTable()}
    </DisplayBox>
  );
}
