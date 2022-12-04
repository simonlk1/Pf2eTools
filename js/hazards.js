"use strict";class HazardsPage extends ListPage{constructor(){const pageFilter=new PageFilterHazards;super({dataSource:"data/hazards.json",pageFilter:pageFilter,listClass:"hazards",sublistClass:"subhazards",dataProps:["hazard"]})}getListItem(it,thI,isExcluded){this._pageFilter.mutateAndAddToFilters(it,isExcluded);const eleLi=document.createElement("li");eleLi.className=`row ${isExcluded?"row--blacklisted":""}`;const source=Parser.sourceJsonToAbv(it.source);const hash=UrlUtil.autoEncodeHash(it);const type=it.traits.includes("complex")?"Complex":"Simple";eleLi.innerHTML=`<a href="#${hash}" class="lst--border">\n\t\t\t<span class="bold pl-0 col-4-2">${it.name}</span>\n\t\t\t<span class="col-4-1 text-center">${type}</span>\n\t\t\t<span class="col-1-7 text-center">${it.level}</span>\n\t\t\t<span class="col-2 text-center ${Parser.sourceJsonToColor(it.source)}" title="${Parser.sourceJsonToFull(it.source)}" ${BrewUtil.sourceJsonToStyle(it.source)}>${source}</span>\n\t\t</a>`;const listItem=new ListItem(thI,eleLi,it.name,{hash:hash,type:type,level:it.level,source:source},{uniqueId:it.uniqueId?it.uniqueId:thI,isExcluded:isExcluded});eleLi.addEventListener("click",(evt=>this._list.doSelect(listItem,evt)));eleLi.addEventListener("contextmenu",(evt=>ListUtil.openContextMenu(evt,this._list,listItem)));return listItem}handleFilterChange(){const f=this._filterBox.getValues();this._list.filter((item=>this._pageFilter.toDisplay(f,this._dataList[item.ix])));FilterBox.selectFirstVisible(this._dataList)}getSublistItem(it,pinId){const hash=UrlUtil.autoEncodeHash(it);const type=it.traits.includes("Complex")?"Complex":"Simple";const $ele=$(`<li class="row">\n\t\t\t<a href="#${hash}" class="lst--border">\n\t\t\t\t<span class="bold col-5-2 pl-0">${it.name}</span>\n\t\t\t\t<span class="col-4-6 text-center">${type}</span>\n\t\t\t\t<span class="col-2-2 pr-0 text-center">${it.level}</span>\n\t\t\t</a>\n\t\t</li>`).contextmenu((evt=>ListUtil.openSubContextMenu(evt,listItem)));const listItem=new ListItem(pinId,$ele,it.name,{hash:hash,level:it.level,type:type});return listItem}doLoadHash(id){Renderer.get().setFirstSection(true);const it=this._dataList[id];const $pgContent=$("#pagecontent").empty();const buildStatsTab=()=>{$pgContent.append(Renderer.hazard.getRenderedString(it))};const buildInfoTab=async()=>{const quickRules=await Renderer.utils.pGetQuickRules("hazard");$pgContent.append(quickRules)};const statsTab=Renderer.utils.tabButton("Hazard",(()=>{}),buildStatsTab);const infoTab=Renderer.utils.tabButton("Quick Rules",(()=>{}),buildInfoTab);Renderer.utils.bindTabButtons(statsTab,infoTab);ListUtil.updateSelected()}async pDoLoadSubHash(sub){sub=this._filterBox.setFromSubHashes(sub);await ListUtil.pSetFromSubHashes(sub)}}let hazardsPage;window.addEventListener("load",(async()=>{await Renderer.trait.preloadTraits();hazardsPage=new HazardsPage;hazardsPage.pOnLoad()}));