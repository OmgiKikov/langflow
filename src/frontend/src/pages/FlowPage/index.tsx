import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/headerComponent";
import { TabsContext } from "../../contexts/tabsContext";
import { getVersion } from "../../controllers/API";
import Page from "./components/PageComponent";

export default function FlowPage(): JSX.Element {
  const { flows, tabId, setTabId } = useContext(TabsContext);
  const { id } = useParams();

  // Set flow tab id
  useEffect(() => {
    setTabId(id!);
  }, [id]);

  // Initialize state variable for the version
  const [version, setVersion] = useState("");
  useEffect(() => {
    getVersion().then((data) => {
      setVersion(data.version);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="flow-page-positioning">
        {flows.length > 0 &&
          tabId !== "" &&
          flows.findIndex((flow) => flow.id === tabId) !== -1 && (
            <Page flow={flows.find((flow) => flow.id === tabId)!} />
          )}
        <a target={"_blank"} href="" className="">
          {version && <div className="mt-1">⛓️ LLMBuilder v{version}</div>}
          <div className={version ? "mt-2" : "mt-1"}>Created by Kikov</div>
        </a>
      </div>
    </>
  );
}
