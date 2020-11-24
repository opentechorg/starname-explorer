import { fromBase64 } from "@cosmjs/encoding";
import { LcdClient } from "@cosmjs/launchpad";
import { unmarshalTx } from "@tendermint/amino-js";
import { base64ToBytes } from "@tendermint/belt";
import dotenv from "dotenv";

dotenv.config();

const tx =
  "{\n" +
  '  "jsonrpc": "2.0",\n' +
  '  "id": 1,\n' +
  '  "result": {\n' +
  `    "query": "tm.event='Tx' AND message.action='register_account'",\n` +
  '    "data": {\n' +
  '      "type": "tendermint/event/Tx",\n' +
  '      "value": {\n' +
  '        "TxResult": {\n' +
  '          "height": "1226449",\n' +
  '          "index": 0,\n' +
  '          "tx": "/wEoKBapCnfWmXn+CgNpb3YSBmJhc2U2NBoUiZ/FHc8rbmeqYxdV0fZWYkrpkpciFImfxR3PK25nqmMXVdH2VmJK6ZKXKjgKCWFzc2V0OmlvdhIrc3RhcjEzeDB1Mjh3MDlkaHgwMm5yemEyYXJhamt2Zjl3bnk1aG02dWw4bBIUCg4KBHVpb3YSBjMwMDAwMBDgpxIaagom61rphyEDLdh4CajpcRq89PpLr8RpUeD+BCgyICuhwJVc4gEJzekSQFSf+foG3wolPbVn9rr8TxzjQg681wl2rkbusjha/FCAF9fSGm5vuVJFaEwORlxdlkc+BmDrxBSIppWQUaG+xKE=",\n' +
  '          "result": {\n' +
  '            "log": "[{\\"msg_index\\":0,\\"log\\":\\"\\",\\"events\\":[{\\"type\\":\\"message\\",\\"attributes\\":[{\\"key\\":\\"action\\",\\"value\\":\\"register_account\\"},{\\"key\\":\\"sender\\",\\"value\\":\\"star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l\\"},{\\"key\\":\\"module\\",\\"value\\":\\"starname\\"},{\\"key\\":\\"action\\",\\"value\\":\\"register_account\\"},{\\"key\\":\\"domain_name\\",\\"value\\":\\"iov\\"},{\\"key\\":\\"account_name\\",\\"value\\":\\"base64\\"},{\\"key\\":\\"owner\\",\\"value\\":\\"star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l\\"},{\\"key\\":\\"broker\\"}]},{\\"type\\":\\"transfer\\",\\"attributes\\":[{\\"key\\":\\"recipient\\",\\"value\\":\\"star17xpfvakm2amg962yls6f84z3kell8c5l3rdfu3\\"},{\\"key\\":\\"sender\\",\\"value\\":\\"star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l\\"},{\\"key\\":\\"amount\\",\\"value\\":\\"1000000uiov\\"}]}]}]",\n' +
  '            "gas_wanted": "300000",\n' +
  '            "gas_used": "88943",\n' +
  '            "events": [\n' +
  "              {\n" +
  '                "type": "message",\n' +
  '                "attributes": [\n' +
  "                  {\n" +
  '                    "key": "YWN0aW9u",\n' +
  '                    "value": "cmVnaXN0ZXJfYWNjb3VudA=="\n' +
  "                  }\n" +
  "                ]\n" +
  "              },\n" +
  "              {\n" +
  '                "type": "transfer",\n' +
  '                "attributes": [\n' +
  "                  {\n" +
  '                    "key": "cmVjaXBpZW50",\n' +
  '                    "value": "c3RhcjE3eHBmdmFrbTJhbWc5NjJ5bHM2Zjg0ejNrZWxsOGM1bDNyZGZ1Mw=="\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "c2VuZGVy",\n' +
  '                    "value": "c3RhcjEzeDB1Mjh3MDlkaHgwMm5yemEyYXJhamt2Zjl3bnk1aG02dWw4bA=="\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "YW1vdW50",\n' +
  '                    "value": "MTAwMDAwMHVpb3Y="\n' +
  "                  }\n" +
  "                ]\n" +
  "              },\n" +
  "              {\n" +
  '                "type": "message",\n' +
  '                "attributes": [\n' +
  "                  {\n" +
  '                    "key": "c2VuZGVy",\n' +
  '                    "value": "c3RhcjEzeDB1Mjh3MDlkaHgwMm5yemEyYXJhamt2Zjl3bnk1aG02dWw4bA=="\n' +
  "                  }\n" +
  "                ]\n" +
  "              },\n" +
  "              {\n" +
  '                "type": "message",\n' +
  '                "attributes": [\n' +
  "                  {\n" +
  '                    "key": "bW9kdWxl",\n' +
  '                    "value": "c3Rhcm5hbWU="\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "YWN0aW9u",\n' +
  '                    "value": "cmVnaXN0ZXJfYWNjb3VudA=="\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "ZG9tYWluX25hbWU=",\n' +
  '                    "value": "aW92"\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "YWNjb3VudF9uYW1l",\n' +
  '                    "value": "YmFzZTY0"\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "b3duZXI=",\n' +
  '                    "value": "c3RhcjEzeDB1Mjh3MDlkaHgwMm5yemEyYXJhamt2Zjl3bnk1aG02dWw4bA=="\n' +
  "                  },\n" +
  "                  {\n" +
  '                    "key": "YnJva2Vy",\n' +
  '                    "value": ""\n' +
  "                  }\n" +
  "                ]\n" +
  "              }\n" +
  "            ]\n" +
  "          }\n" +
  "        }\n" +
  "      }\n" +
  "    },\n" +
  '    "events": {\n' +
  '      "message.module": [\n' +
  '        "starname"\n' +
  "      ],\n" +
  '      "message.account_name": [\n' +
  '        "base64"\n' +
  "      ],\n" +
  '      "message.owner": [\n' +
  '        "star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l"\n' +
  "      ],\n" +
  '      "tx.hash": [\n' +
  '        "AE2FD35FE47EDFCC088B81434E7F75F96AB57DD9B8B633E21548BEAB73987E29"\n' +
  "      ],\n" +
  '      "transfer.sender": [\n' +
  '        "star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l"\n' +
  "      ],\n" +
  '      "transfer.recipient": [\n' +
  '        "star17xpfvakm2amg962yls6f84z3kell8c5l3rdfu3"\n' +
  "      ],\n" +
  '      "transfer.amount": [\n' +
  '        "1000000uiov"\n' +
  "      ],\n" +
  '      "message.sender": [\n' +
  '        "star13x0u28w09dhx02nrza2arajkvf9wny5hm6ul8l"\n' +
  "      ],\n" +
  '      "message.domain_name": [\n' +
  '        "iov"\n' +
  "      ],\n" +
  '      "message.broker": [\n' +
  '        ""\n' +
  "      ],\n" +
  '      "tm.event": [\n' +
  '        "Tx"\n' +
  "      ],\n" +
  '      "tx.height": [\n' +
  '        "1226449"\n' +
  "      ],\n" +
  '      "message.action": [\n' +
  '        "register_account",\n' +
  '        "register_account"\n' +
  "      ]\n" +
  "    }\n" +
  "  }\n" +
  "}";

async function main(tx: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = new LcdClient(process.env.REST_URL!);
  const response = await client.post("/txs/decode", { tx });
  console.log(response.result.msg);
}

const json = JSON.parse(tx);

main(json.result.data.value.TxResult.tx);

// const json = JSON.parse(tx);
// console.log(unmarshalTx(base64ToBytes(json.result.data.value.TxResult.tx)));

/* const txBase64 =
  "uxfwYl3uCrAWtC1hTgofQ29zbW9zIEh1YiAzIFVwZ3JhZGUgUHJvcG9zYWwgRRLdFUZpZ21lbnQgTmV0d29ya3MgKGh0dHBzOi8vZmlnbWVudC5uZXR3b3JrKQoKLT0tPS0KCkZ1bGwgcHJvcG9zYWw6Cmh0dHBzOi8vaXBmcy5pby9pcGZzL1FtZkp5ZDY0c3JKU1g4MjRXb05uRjZCYnZGNHd2UEdxVkJ5blplTjk4Qzd5Z3EKCi09LT0tCgpfRGVjaXNpb25fCgpXZSBhcmUgc2lnbmFsbGluZyB0aGF0OgoKMS4gVGhlIEdhaWEgMi4wLjMgaW1wbGVtZW50YXRpb24gaXMgYWxpZ25lZCB3aXRoIHRoZSBsaXN0IG9mIGhpZ2gtbGV2ZWwgY2hhbmdlcyBhcHByb3ZlZCBpbiBDb3Ntb3MgSHViIDMgVXBncmFkZSBQcm9wb3NhbCBBLgoKMi4gV2UgYXJlIHByZXBhcmVkIHRvIHVwZ3JhZGUgdGhlIENvc21vcyBIdWIgdG8gY29zbW9zaHViLTMgYmFzZWQgdXBvbgoJYS4gQ29tbWl0IGhhc2g6IDJmNjc4M2UyOThmMjVmZjRlMTJjYjg0NTQ5Nzc3MDUzYWI4ODc0OWE7CgliLiBUaGUgc3RhdGUgZXhwb3J0IGZyb20gY29zbW9zaHViLTIgYXQgQmxvY2sgSGVpZ2h0IDI5MDIwMDA7CgljLiBHZW5lc2lzIHRpbWU6IDYwIG1pbnV0ZXMgYWZ0ZXIgdGhlIHRpbWVzdGFtcCBhdCBCbG9jayBIZWlnaHQgMjkwMjAwMC4KCjMuIFdlIGFyZSBwcmVwYXJlZCB0byByZWxhdW5jaCBjb3Ntb3NodWItMgoJYS4gSW4gdGhlIGV2ZW50IG9mOgoJCWkuIEEgbm9uLXRyaXZpYWwgZXJyb3IgaW4gdGhlIG1pZ3JhdGlvbiBwcm9jZWR1cmUgYW5kL29yCgkJaWkuIEEgbmVlZCBmb3IgYWQtaG9jIGdlbmVzaXMgZmlsZSBjaGFuZ2VzCgkJaWlpLiBUaGUgZmFpbHVyZSBvZiBjb3Ntb3NodWItMyB0byBwcm9kdWNlIHR3byAoMikgYmxvY2tzIGJ5IDE4MCBtaW51dGVzIGFmdGVyIHRoZSB0aW1lc3RhbXAgb2YgQmxvY2sgSGVpZ2h0IDI5MDIwMDA7CgliLiBVc2luZzoKCQlpLiBUaGUgc3RhcnRpbmcgYmxvY2sgaGVpZ2h0OiAyOTAyMDAwCgkJaWkuIFNvZnR3YXJlIHZlcnNpb246IENvc21vcyBTREsgdjAuMzQuNisgaHR0cHM6Ly9naXRodWIuY29tL2Nvc21vcy9jb3Ntb3Mtc2RrL3JlbGVhc2VzL3RhZy92MC4zNC4xMAoJCWlpaS4gVGhlIGZ1bGwgZGF0YSBzbmFwc2hvdCBhdCBleHBvcnQgQmxvY2sgSGVpZ2h0IDI5MDIwMDA7CgljLiBBbmQgd2lsbCBjb25zaWRlciB0aGUgcmVsYXVuY2ggY29tcGxldGUgYWZ0ZXIgY29zbW9zaHViLTIgaGFzIHJlYWNoZWQgY29uc2Vuc3VzIG9uIEJsb2NrIDI5MDIwMDEuCgo0LiBUaGUgdXBncmFkZSB3aWxsIGJlIGNvbnNpZGVyZWQgY29tcGxldGUgYWZ0ZXIgY29zbW9zaHViLTMgaGFzIHJlYWNoZWQgY29uc2Vuc3VzIG9uIEJsb2NrIEhlaWdodCAyIHdpdGhpbiAxMjAgbWludXRlcyBvZiBnZW5lc2lzIHRpbWUuCgo1LiBUaGlzIHByb3Bvc2FsIGlzIHZvaWQgaWYgdGhlIHZvdGluZyBwZXJpb2QgaGFzIG5vdCBjb25jbHVkZWQgYnkgQmxvY2sgSGVpZ2h0IDI4NTIyMDIuCgotPS09LQoKX0NvbnRleHRfClRoaXMgcHJvcG9zYWwgZm9sbG93cyBDb3Ntb3MgSHViIDMgVXBncmFkZSBQcm9wb3NhbCBEIChodHRwczovL2h1YmJsZS5maWdtZW50Lm5ldHdvcmsvY29zbW9zL2NoYWlucy9jb3Ntb3NodWItMi9nb3Zlcm5hbmNlL3Byb3Bvc2Fscy8xNikgYWthIFByb3AgMTYsIHdoaWNoIHBhc3NlZCBpbiB2b3RlLCBidXQgZmFpbGVkIGluIGV4ZWN1dGlvbiAoaHR0cHM6Ly9mb3J1bS5jb3Ntb3MubmV0d29yay90L2Nvc21vcy1odWItMy11cGdyYWRlLXBvc3QtbW9ydGVtLzI3NzIpLiBUaGlzIHByb3Bvc2FsIGlzIGludGVuZGVkIHRvIHN1Y2NlZWQgd2hlcmUgUHJvcCAxNiBmYWlsZWQuCgpUaGlzIHByb3Bvc2FsIGlzIGludGVuZGVkIHRvIHNpZ25hbCBhY2NlcHRhbmNlL3JlamVjdGlvbiBvZiB0aGUgcHJlY2lzZSBzb2Z0d2FyZSByZWxlYXNlIHRoYXQgd2lsbCBjb250YWluIHRoZSBjaGFuZ2VzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBDb3Ntb3MgSHViIDMgdXBncmFkZS4gQSBoaWdoIGxldmVsIG92ZXJ2aWV3IG9mIHRoZXNlIGNoYW5nZXMgd2FzIHN1Y2Nlc3NmdWxseSBhcHByb3ZlZCBieSB0aGUgdm90ZXJzIHNpZ25hbGxpbmcgdmlhIENvc21vcyBIdWIgMyBVcGdyYWRlIFByb3Bvc2FsIEE6Cmh0dHBzOi8vaHViYmxlLmZpZ21lbnQubmV0d29yay9jb3Ntb3MvY2hhaW5zL2Nvc21vc2h1Yi0yL2dvdmVybmFuY2UvcHJvcG9zYWxzLzEzCgpXZSBhcmUgcHJvcG9zaW5nIHRvIHVzZSB0aGlzIGNvZGUgaHR0cHM6Ly9naXRodWIuY29tL2Nvc21vcy9nYWlhL3JlbGVhc2VzL3RhZy92Mi4wLjMgdG8gdXBncmFkZSB0aGUgQ29zbW9zIEh1Yi4KV2UgYXJlIHByb3Bvc2luZyB0byBleHBvcnQgdGhlIGxlZGdlcuKAmXMgc3RhdGUgYXQgQmxvY2sgSGVpZ2h0IDIsOTAyLDAwMCwgd2hpY2ggd2UgZXhwZWN0IHRvIG9jY3VyIG9uIERlY2VtYmVyIDExLCAyMDE5IGF0IG9yIGFyb3VuZCAxNDoyNyBVVEMgYXNzdW1pbmcgYW4gYXZlcmFnZSBvZiA2Ljk0IHNlY29uZHMgcGVyIGJsb2NrLiBQbGVhc2Ugbm90ZSB0aGF0IHRoZXJlIHdpbGwgbGlrZWx5IGJlIGEgdmFyaWFuY2UgZnJvbSB0aGlzIHRhcmdldCB0aW1lLCBkdWUgdG8gZGV2aWF0aW9ucyBpbiBibG9jayB0aW1lLgoKV2UgYXJlIHByb3Bvc2luZyB0aGF0IHRoZSBDb3Ntb3MgSHViIDMgZ2VuZXNpcyB0aW1lIGJlIHNldCB0byA2MCBtaW51dGVzIGFmdGVyIEJsb2NrIEhlaWdodCAyLDkwMiwwMDAuCgotPS09LQoKQ28tb3JkaW5hdGlvbiBpbiBjYXNlIG9mIGZhaWx1cmUgd2lsbCBoYXBwZW4gaW4gdGhpcyBjaGFubmVsOiBodHRwczovL3Jpb3QuaW0vYXBwLyMvcm9vbS8jY29zbW9zX3ZhbGlkYXRvcnNfdGVjaG5pY2FsX3VwZGF0ZXM6bWF0cml4Lm9yZxgBIhQrv2OiyZYsAZ2+i0gazel9jlBW/ioRCgV1YXRvbRIIMTIwMDAwMDASFgoQCgV1YXRvbRIHMTQwMDAwMBDAmgwaagom61rphyECbBkcVpHNEJPxF+jExArw3TClQZuDf9VHGAb4d5HDAgoSQPptMTINbW5vADVyreOmURHGI69xIR2LHULPmoqQGxXJTmlSQ+kzkP51iMBxC1RK6N5+LTfQmrmXScUDFJVTvps=";

const txBase64 =
  "rgEoKBapCjZS59jqCgpnb29nbGUuY29tEg4KCW5hbWV0b2tlbhIBNRoUr67sqicZ8wXbWkNLD8E6c0TGM/YSBBDAmgwaagom61rphyEC6ICqudQCIugpL8NEvi6Fblxk+ZB+51T+NUDg0WdMQCUSQG0z4HhxINONIjPcQc/GDyVOjU9CRovZaT3GxcekSvN6SBQx94xgwMkq7EqivCxSqYB/TDC0Gp5Z/6z2+Z4Km3k=";

console.log(unmarshalTx(base64ToBytes(txBase64)));

// console.log(Buffer.from(tx, "base64").toString("utf-8"));
*/
