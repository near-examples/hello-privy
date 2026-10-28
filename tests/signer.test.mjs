import assert from 'node:assert/strict';
import test from 'node:test';
import { KeyPair, Transaction } from 'near-api-js';
import { hexToBytes, bytesToHex } from '@noble/hashes/utils';
import { privySigner } from '../src/context/signer.ts';

test('Privy signs the SDK transaction hash and returns a verifiable SDK outcome', async () => {
  const key = KeyPair.fromRandom('ed25519');
  let signedHash;
  const provider = { viewAccessKeyList: async () => ({ keys: [{ public_key: key.getPublicKey().toString() }] }) };
  const signer = new privySigner(async ({ hash, chainType, address }) => {
    assert.equal(chainType, 'near');
    assert.equal(address, 'alice.testnet');
    signedHash = hexToBytes(hash.slice(2));
    return { signature: `0x${bytesToHex(key.sign(signedHash).signature)}` };
  }, 'alice.testnet', provider);
  const transaction = new Transaction({ signerId: 'alice.testnet', publicKey: key.getPublicKey(), nonce: 1n,
    receiverId: 'hello.testnet', actions: [], blockHash: new Uint8Array(32) });
  const { txHash, signedTransaction } = await signer.signTransaction(transaction);
  assert.deepEqual(txHash, signedHash);
  assert.equal(key.verify(txHash, signedTransaction.signature.data), true);
  assert.deepEqual(signedTransaction.transaction, transaction);
});
