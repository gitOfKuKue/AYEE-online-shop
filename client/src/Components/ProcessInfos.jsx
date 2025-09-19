import React from "react";
import Container from "./EssentialComponents/Container";
import ProcessFlowGraphic from "./ProcessFlowGraphic";
import ProcessFlowCards from "./ProcessFlowCards";

const ProcessInfos = () => {
  

  return (
    <section className="bg-iconic py-10 mb-10">
      <Container>
        {/* Process Flow */}
        <ProcessFlowGraphic />

        {/* Rules */}
        <ProcessFlowCards />
      </Container>
    </section>
  );
};

export default ProcessInfos;
