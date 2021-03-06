'use-strict';

import TestManager from './helper/TestManager';

import LoaderTest from './tests/LoaderTest';
import MessagerTest from './tests/MessagerTest';
import MathUtilsTest from './tests/MathUtilsTest';
import PointTest from './tests/PointTest';
import BoundsTest from './tests/BoundsTest';
import ColorTest from './tests/ColorTest';
import Matrix3Test from './tests/Matrix3Test';
import ScenePatternTest from './tests/ScenePatternTest';
import { EngineManager, UIManager } from '../src/entry';
import ViewportPatternTest from './tests/ViewportPatternTest';
import GameObjectPatternTest from './tests/GameObjectPatternTest';
import ComponentPatternTest from './tests/ComponentPatternTest';
import TransformComponentTest from './tests/TransformComponentTest';
import RenderablePatternTest from './tests/RenderablePatternTest';
import TextureManagerTest from './tests/TextureManagerTest';
import ProgramManagerTest from './tests/ProgramManagerTest';
import AudioManagerTest from './tests/AudioManagerTest';
import DOMManagerTest from './tests/DOMManagerTest';
import UIManagerTest from './tests/UIManagerTest';
import AnimationComponentTest from './tests/AnimationComponentTest';
import InputPatternTest from './tests/InputPatternTest';
import ClickControllerComponentTest from './tests/ClickControllerComponentTest';
import Renderable2DGridComponentTest from './tests/Renderable2DGridComponentTest';
import RenderableTextComponentTest from './tests/RenderableTextComponentTest';

EngineManager.start();

new LoaderTest();
new MessagerTest();
new MathUtilsTest();
new PointTest();
new BoundsTest();
new ColorTest();
new Matrix3Test();
new TextureManagerTest();
new ProgramManagerTest();
new AudioManagerTest();
new DOMManagerTest();
new UIManagerTest();
new ScenePatternTest();
new ViewportPatternTest();
new GameObjectPatternTest();
new ComponentPatternTest();
new TransformComponentTest();
new RenderablePatternTest();
new AnimationComponentTest();
new Renderable2DGridComponentTest();
new RenderableTextComponentTest();
new InputPatternTest();
new ClickControllerComponentTest();
TestManager.run();