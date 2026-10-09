from pathlib import Path
import json,os,shutil,subprocess,tempfile
source=Path(__file__).with_name('board-sync.sh')
with tempfile.TemporaryDirectory(prefix='codex-board-') as td:
 base=Path(td);repo=base/'repo';other=base/'other';binp=base/'bin';binp.mkdir()
 for r in [repo,other]:
  r.mkdir();subprocess.run(['git','init','-q',str(r)],check=True)
 (repo/'sub').mkdir();(repo/'.codex/hooks').mkdir(parents=True);(repo/'scripts').mkdir()
 hook=repo/'.codex/hooks/board-sync.sh';shutil.copy2(source,hook)
 (repo/'scripts/sync-board.mjs').write_text('')
 log=base/'log'
 node=binp/'node';node.write_text('#!/usr/bin/env python3\nimport os,sys,time\nwith open(os.environ["BOARD_TEST_LOG"],"a") as f:f.write(sys.argv[-1]+"\\n")\nif os.environ.get("BOARD_TEST_FAIL")==sys.argv[-1]:sys.exit(7)\nif os.environ.get("BOARD_TEST_SLEEP"):time.sleep(20)\n');node.chmod(0o755)
 env={**os.environ,'PATH':str(binp)+os.pathsep+os.environ['PATH'],'BOARD_TEST_LOG':str(log)}
 def probe(command,expected,*,cwd=repo,key='command',fail=None,raw=None,workdir=None,sleep=False):
  log.write_text('');e=env.copy()
  if fail:e['BOARD_TEST_FAIL']=fail
  if sleep:e['BOARD_TEST_SLEEP']='1'
  payload={'cwd':str(cwd),'tool_input':{key:command}}
  if workdir:payload['tool_input']['workdir']=str(workdir)
  r=subprocess.run(['bash',str(hook)],input=raw if raw is not None else json.dumps(payload),text=True,capture_output=True,env=e,timeout=18)
  assert r.returncode==0,(command,r.stderr)
  calls=log.read_text().splitlines();assert calls==expected,(command,calls)
  if fail or raw is not None or sleep:assert 'systemMessage' in json.loads(r.stdout),(command,r.stdout)
  else:assert not r.stdout,(command,r.stdout)
 cases=[('git commit -m test',['--regen','--check'],{}),('git commit -m test',['--regen','--check'],{'key':'cmd','cwd':repo/'sub'}),(f'git -C {repo} commit -m test',['--regen','--check'],{'cwd':other}),('git -c user.name=Fixture commit -m test',['--regen','--check'],{}),("echo 'git commit'",[],{}),('git status',[],{}),(f'git -C {other} commit -m test',[],{}),('git status && git commit -m test',[],{}),('git commit --dry-run',[],{}),('git commit -m test',['--regen'],{'fail':'--regen'}),('git commit -m test',['--regen','--check'],{'fail':'--check'}),('',[],{'raw':'no json'}),('git commit -m test',['--regen','--check'],{'cwd':other,'workdir':repo}),('git commit -m test',['--regen'],{'sleep':True})]
 for command,expected,kwargs in cases:probe(command,expected,**kwargs)
 print(f'PASS {len(cases)} cas : commande/cmd, cwd/workdir, git -C/-c, faux positifs, autre repo, erreurs et timeout.')
