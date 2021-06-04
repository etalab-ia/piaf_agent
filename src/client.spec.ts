import {clientFromUrl} from "./client";

describe('extract client from url', () => {
  test('should extract client', () => {
    expect(clientFromUrl("https://google.fr")).toBeNull()
    expect(clientFromUrl("https://google.fr/test")).toBe("test")
    expect(clientFromUrl("https://google.fr/test/")).toBe("test")
    expect(clientFromUrl("https://piaf.datascience.etalab.studio/piafagent_crpa/")).toBe("piafagent_crpa")
    expect(clientFromUrl("https://piaf.datascience.etalab.studio/piafagent_crpa/Answers")).toBe("piafagent_crpa")
  });

});
